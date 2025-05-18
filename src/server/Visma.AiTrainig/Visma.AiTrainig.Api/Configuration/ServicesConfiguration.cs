using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using Visma.AiTrainig.Api.Data;
using Visma.AiTrainig.Api.Models;
using Visma.AiTrainig.Api.Services;
using Visma.AiTrainig.Api.Validators;

namespace Visma.AiTrainig.Api.Configuration;

/// <summary>
/// Extensions for configuring application services
/// </summary>
public static class ServicesConfiguration
{
    /// <summary>
    /// Configures all application services
    /// </summary>
    public static void ConfigureServices(this WebApplicationBuilder builder)
    {        // Add SQLite with Entity Framework Core
        builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlite("Data Source=Data/aitraining.db"));
        
        // Register FluentValidation
        builder.Services.AddValidatorsFromAssemblyContaining<TrainingMaterialValidator>();
        
        // Register services
        builder.Services.AddScoped<TrainingMaterialService>();
        
        // Add controllers
        builder.Services.AddControllers();
        
        // Configure JSON options
        builder.Services.ConfigureHttpJsonOptions(options =>
        {
            options.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
        });
    }
}

[JsonSerializable(typeof(TrainingMaterial))]
[JsonSerializable(typeof(List<TrainingMaterial>))]
[JsonSerializable(typeof(Microsoft.AspNetCore.Mvc.ValidationProblemDetails))]
[JsonSerializable(typeof(Microsoft.AspNetCore.Mvc.ProblemDetails))]
[JsonSerializable(typeof(Dictionary<string, object>))]
[JsonSerializable(typeof(IDictionary<string, string[]>))]
internal partial class AppJsonSerializerContext : JsonSerializerContext
{
}
