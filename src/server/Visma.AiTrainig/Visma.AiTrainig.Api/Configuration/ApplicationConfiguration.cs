using Microsoft.EntityFrameworkCore;
using Visma.AiTrainig.Api.Data;
using Visma.AiTrainig.Api.Handlers;

namespace Visma.AiTrainig.Api.Configuration;

/// <summary>
/// Extensions for configuring the application pipeline
/// </summary>
public static class ApplicationConfiguration
{
    /// <summary>
    /// Configures the application pipeline and endpoints
    /// </summary>
    public static void ConfigureApplication(this WebApplication app)
    {
        // Initialize database
        InitializeDatabase(app);
        
        // Map controllers
        app.MapControllers();
          // Map API endpoints
        app.MapTrainingMaterialsEndpoints();
        app.MapAdminEndpoints();
    }
    
    /// <summary>
    /// Initialize and migrate database
    /// </summary>
    private static void InitializeDatabase(WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        dbContext.Database.EnsureCreated();
    }
}
