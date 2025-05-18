using System.Text.Json.Serialization;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Visma.AiTrainig.Api.Data;

namespace Visma.AiTrainig.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateSlimBuilder(args);

            // Add SQLite with Entity Framework Core
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlite("Data Source=aitraining.db"));
              // Register FluentValidation
            builder.Services.AddValidatorsFromAssemblyContaining<TrainingMaterialValidator>();
            
            // Register services
            builder.Services.AddScoped<TrainingMaterialService>();
            
            // Add controllers
            builder.Services.AddControllers();
            
            builder.Services.ConfigureHttpJsonOptions(options =>
            {
                options.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
            });            var app = builder.Build();

            // Create and migrate database on startup
            using (var scope = app.Services.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                dbContext.Database.EnsureCreated();
            }
            
            // Map controllers
            app.MapControllers();

            // Keep legacy Todo endpoints for compatibility
            var sampleTodos = new Todo[] {
                new(1, "Walk the dog"),
                new(2, "Do the dishes", DateOnly.FromDateTime(DateTime.Now)),
                new(3, "Do the laundry", DateOnly.FromDateTime(DateTime.Now.AddDays(1))),
                new(4, "Clean the bathroom"),
                new(5, "Clean the car", DateOnly.FromDateTime(DateTime.Now.AddDays(2)))
            };

            var todosApi = app.MapGroup("/todos");
            todosApi.MapGet("/", () => sampleTodos);
            todosApi.MapGet("/{id}", (int id) =>
                sampleTodos.FirstOrDefault(a => a.Id == id) is { } todo
                    ? Results.Ok(todo)
                    : Results.NotFound());            // Training Materials API
            var materialsApi = app.MapGroup("/api/materials");
            
            materialsApi.MapGet("/", async (TrainingMaterialService service) => 
                Results.Ok(await service.GetAllAsync()));
                
            materialsApi.MapGet("/{id}", async (int id, TrainingMaterialService service) =>
            {
                var material = await service.GetByIdAsync(id);
                return material is not null 
                    ? Results.Ok(material) 
                    : Results.NotFound();
            });
              // Admin API
            var adminApi = app.MapGroup("/api/admin");
              app.MapGet("/api/admin/status", () => "Admin API is working!");
            
            app.MapGet("/api/admin/db/check", async (AppDbContext dbContext) => 
            {
                var count = await dbContext.TrainingMaterials.CountAsync();
                return new { Count = count, Message = "Database is working" };
            });
            
            app.MapGet("/api/admin/materials/count", async (AppDbContext dbContext) =>
            {
                var activeCount = await dbContext.TrainingMaterials.CountAsync(m => m.IsActive);
                var inactiveCount = await dbContext.TrainingMaterials.CountAsync(m => !m.IsActive);
                return new { Active = activeCount, Inactive = inactiveCount, Total = activeCount + inactiveCount };
            });
              app.MapPost("/api/admin/materials/{id}/restore", async (int id, AppDbContext dbContext) =>
            {
                var material = await dbContext.TrainingMaterials.FindAsync(id);
                if (material == null)
                    return Results.NotFound();
                
                material.IsActive = true;
                material.UpdatedAt = DateTimeOffset.UtcNow;
                await dbContext.SaveChangesAsync();
                
                return Results.Ok(new { Success = true, MaterialId = id, Message = $"Material '{material.Title}' has been restored." });
            });
            
            materialsApi.MapPost("/", async (TrainingMaterial material, TrainingMaterialService service, IValidator<TrainingMaterial> validator) =>
            {
                var validationResult = await validator.ValidateAsync(material);
                if (!validationResult.IsValid)
                {
                    return Results.ValidationProblem(validationResult.ToDictionary());
                }
                
                var result = await service.CreateAsync(material);
                return Results.Created($"/api/materials/{result.Id}", result);
            });
            
            materialsApi.MapPut("/{id}", async (int id, TrainingMaterial material, TrainingMaterialService service, IValidator<TrainingMaterial> validator) =>
            {
                if (id != material.Id)
                {
                    return Results.BadRequest("ID mismatch");
                }
                
                var validationResult = await validator.ValidateAsync(material);
                if (!validationResult.IsValid)
                {
                    return Results.ValidationProblem(validationResult.ToDictionary());
                }
                
                var success = await service.UpdateAsync(material);
                return success ? Results.NoContent() : Results.NotFound();
            });
            
            materialsApi.MapDelete("/{id}", async (int id, TrainingMaterialService service) =>
            {
                var success = await service.DeleteAsync(id);
                return success ? Results.NoContent() : Results.NotFound();
            });

            app.Run();
        }
    }

    public record Todo(int Id, string? Title, DateOnly? DueBy = null, bool IsComplete = false);

    [JsonSerializable(typeof(Todo[]))]
    [JsonSerializable(typeof(TrainingMaterial))]
    [JsonSerializable(typeof(List<TrainingMaterial>))]
    [JsonSerializable(typeof(ValidationProblemDetails))]
    [JsonSerializable(typeof(ProblemDetails))]
    [JsonSerializable(typeof(Dictionary<string, object>))]
    [JsonSerializable(typeof(IDictionary<string, string[]>))]
    internal partial class AppJsonSerializerContext : JsonSerializerContext
    {

    }
}
