using Visma.AiTrainig.Api.Data;
using Visma.AiTrainig.Api.Models;
using Visma.AiTrainig.Api.Services;

namespace Visma.AiTrainig.Api.Handlers;

/// <summary>
/// Extension methods for configuring admin API endpoints
/// </summary>
public static class AdminHandler
{
    /// <summary>
    /// Maps all admin related endpoints
    /// </summary>
    public static void MapAdminEndpoints(this IEndpointRouteBuilder app)
    {
        var adminGroup = app.MapGroup("/api/admin");
        
        // Status endpoint
        adminGroup.MapGet("/status", () => "Admin API is working!");
        
        // Database check endpoint
        adminGroup.MapGet("/db/check", async (TrainingMaterialService service) => 
        {
            var result = await service.CheckDatabaseAsync();
            
            if (result.IsFailure)
                return Results.Problem(result.Error, statusCode: 500);
                
            return Results.Ok(new { Count = result.Value, Message = "Database is working" });
        });
        
        // Materials count endpoint
        adminGroup.MapGet("/materials/count", async (TrainingMaterialService service) =>
        {
            var result = await service.GetMaterialsCountAsync();
            
            if (result.IsFailure)
                return Results.Problem(result.Error, statusCode: 500);
                
            return Results.Ok(new { 
                Active = result.Value.Active, 
                Inactive = result.Value.Inactive, 
                Total = result.Value.Total 
            });
        });
        
        // Materials restore endpoint
        adminGroup.MapPost("/materials/{id}/restore", async (int id, TrainingMaterialService service) =>
        {
            var result = await service.RestoreAsync(id);
            
            if (result.IsFailure)
                return result.Error!.Contains("not found") 
                    ? Results.NotFound(result.Error) 
                    : Results.Problem(result.Error, statusCode: 500);
                    
            return Results.Ok(new { 
                Success = true, 
                MaterialId = id, 
                Message = $"Material '{result.Value!.Title}' has been restored." 
            });
        });
    }
}
