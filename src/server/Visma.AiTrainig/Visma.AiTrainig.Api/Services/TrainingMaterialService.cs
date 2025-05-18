using Microsoft.EntityFrameworkCore;
using Visma.AiTrainig.Api.Data;
using Visma.AiTrainig.Api.Models;

namespace Visma.AiTrainig.Api.Services
{
    /// <summary>
    /// Service for managing training materials
    /// </summary>
    public class TrainingMaterialService
    {
        private readonly AppDbContext _context;

        public TrainingMaterialService(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Gets all active training materials
        /// </summary>
        public async Task<Result<List<TrainingMaterial>>> GetAllAsync()
        {
            try
            {
                var materials = await _context.TrainingMaterials
                    .Where(x => x.IsActive)
                    .OrderBy(x => x.Title)
                    .ToListAsync();
                
                return Result.Success(materials);
            }
            catch (Exception ex)
            {
                return Result.Failure<List<TrainingMaterial>>($"Error retrieving training materials: {ex.Message}");
            }
        }

        /// <summary>
        /// Gets a training material by ID
        /// </summary>
        public async Task<Result<TrainingMaterial>> GetByIdAsync(int id)
        {
            try
            {
                var material = await _context.TrainingMaterials.FindAsync(id);
                
                if (material == null)
                    return Result.Failure<TrainingMaterial>($"Training material with ID {id} not found");
                
                return Result.Success(material);
            }
            catch (Exception ex)
            {
                return Result.Failure<TrainingMaterial>($"Error retrieving training material: {ex.Message}");
            }
        }

        /// <summary>
        /// Creates a new training material
        /// </summary>
        public async Task<Result<TrainingMaterial>> CreateAsync(TrainingMaterial material)
        {
            try
            {
                material.CreatedAt = DateTimeOffset.UtcNow;
                _context.TrainingMaterials.Add(material);
                await _context.SaveChangesAsync();
                
                return Result.Success(material);
            }
            catch (Exception ex)
            {
                return Result.Failure<TrainingMaterial>($"Error creating training material: {ex.Message}");
            }
        }

        /// <summary>
        /// Updates an existing training material
        /// </summary>
        public async Task<Result> UpdateAsync(TrainingMaterial material)
        {
            try
            {
                var existing = await _context.TrainingMaterials.FindAsync(material.Id);
                if (existing == null)
                    return Result.Failure($"Training material with ID {material.Id} not found");

                material.UpdatedAt = DateTimeOffset.UtcNow;
                material.CreatedAt = existing.CreatedAt; // Preserve creation date
                
                _context.Entry(existing).CurrentValues.SetValues(material);
                await _context.SaveChangesAsync();
                
                return Result.Success();
            }
            catch (Exception ex)
            {
                return Result.Failure($"Error updating training material: {ex.Message}");
            }
        }

        /// <summary>
        /// Deletes a training material by ID (soft delete)
        /// </summary>
        public async Task<Result> DeleteAsync(int id)
        {
            try
            {
                var material = await _context.TrainingMaterials.FindAsync(id);
                if (material == null)
                    return Result.Failure($"Training material with ID {id} not found");

                // Soft delete
                material.IsActive = false;
                material.UpdatedAt = DateTimeOffset.UtcNow;
                await _context.SaveChangesAsync();
                
                return Result.Success();
            }
            catch (Exception ex)
            {
                return Result.Failure($"Error deleting training material: {ex.Message}");
            }
        }

        /// <summary>
        /// Gets counts of active, inactive and total training materials
        /// </summary>
        public async Task<Result<(int Active, int Inactive, int Total)>> GetMaterialsCountAsync()
        {
            try
            {
                var activeCount = await _context.TrainingMaterials.CountAsync(m => m.IsActive);
                var inactiveCount = await _context.TrainingMaterials.CountAsync(m => !m.IsActive);
                var total = activeCount + inactiveCount;
                
                return Result.Success((activeCount, inactiveCount, total));
            }
            catch (Exception ex)
            {
                return Result.Failure<(int, int, int)>($"Error retrieving training material counts: {ex.Message}");
            }
        }
        
        /// <summary>
        /// Restores a previously soft-deleted training material
        /// </summary>
        public async Task<Result<TrainingMaterial>> RestoreAsync(int id)
        {
            try
            {
                var material = await _context.TrainingMaterials.FindAsync(id);
                if (material == null)
                    return Result.Failure<TrainingMaterial>($"Training material with ID {id} not found");
                
                if (material.IsActive)
                    return Result.Failure<TrainingMaterial>($"Training material with ID {id} is already active");
                
                material.IsActive = true;
                material.UpdatedAt = DateTimeOffset.UtcNow;
                await _context.SaveChangesAsync();
                
                return Result.Success(material);
            }
            catch (Exception ex)
            {
                return Result.Failure<TrainingMaterial>($"Error restoring training material: {ex.Message}");
            }
        }
        
        /// <summary>
        /// Checks if the database is available and returns the total count of materials
        /// </summary>
        public async Task<Result<int>> CheckDatabaseAsync()
        {
            try
            {
                var count = await _context.TrainingMaterials.CountAsync();
                return Result.Success(count);
            }
            catch (Exception ex)
            {
                return Result.Failure<int>($"Database is not available: {ex.Message}");
            }
        }
    }
}
