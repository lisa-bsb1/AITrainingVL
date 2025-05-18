using FluentValidation;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Visma.AiTrainig.Api.Models;
using Visma.AiTrainig.Api.Services;
using Visma.AiTrainig.Api.Validators;

namespace Visma.AiTrainig.Api.Handlers;

/// <summary>
/// Extension methods for configuring training materials API endpoints
/// </summary>
public static class TrainingMaterialsHandler
{
    /// <summary>
    /// Maps all training material related endpoints
    /// </summary>
    public static void MapTrainingMaterialsEndpoints(this IEndpointRouteBuilder app)
    {
        var materialsApi = app.MapGroup("/api/materials");
        
        materialsApi.MapGet("/", GetAllMaterials);
        materialsApi.MapGet("/{id}", GetMaterialById);
        materialsApi.MapPost("/", CreateMaterial);
        materialsApi.MapPut("/{id}", UpdateMaterial);
        materialsApi.MapDelete("/{id}", DeleteMaterial);
    }    private static async Task<IResult> GetAllMaterials(TrainingMaterialService service)
    {
        var result = await service.GetAllAsync();
        
        if (result.IsFailure)
            return Results.Problem(result.Error, statusCode: 500);
            
        return Results.Ok(result.Value);
    }

    private static async Task<IResult> GetMaterialById(int id, TrainingMaterialService service)
    {
        var result = await service.GetByIdAsync(id);
        
        if (result.IsFailure)
            return result.Error!.Contains("not found") 
                ? Results.NotFound(result.Error) 
                : Results.Problem(result.Error, statusCode: 500);
            
        return Results.Ok(result.Value);
    }

    private static async Task<IResult> CreateMaterial(
        TrainingMaterial material, 
        TrainingMaterialService service, 
        IValidator<TrainingMaterial> validator)
    {
        var validationResult = await validator.ValidateAsync(material);
        if (!validationResult.IsValid)
        {
            return Results.ValidationProblem(validationResult.ToDictionary());
        }
        
        var result = await service.CreateAsync(material);
        
        if (result.IsFailure)
            return Results.Problem(result.Error, statusCode: 500);
            
        return Results.Created($"/api/materials/{result.Value!.Id}", result.Value);
    }

    private static async Task<IResult> UpdateMaterial(
        int id, 
        TrainingMaterial material, 
        TrainingMaterialService service, 
        IValidator<TrainingMaterial> validator)
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
        
        var result = await service.UpdateAsync(material);
        
        if (result.IsFailure)
            return result.Error!.Contains("not found") 
                ? Results.NotFound(result.Error) 
                : Results.Problem(result.Error, statusCode: 500);
                
        return Results.NoContent();
    }

    private static async Task<IResult> DeleteMaterial(int id, TrainingMaterialService service)
    {
        var result = await service.DeleteAsync(id);
        
        if (result.IsFailure)
            return result.Error!.Contains("not found") 
                ? Results.NotFound(result.Error) 
                : Results.Problem(result.Error, statusCode: 500);
                
        return Results.NoContent();
    }
}
