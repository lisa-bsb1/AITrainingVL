using Microsoft.EntityFrameworkCore;

namespace Visma.AiTrainig.Api.Data
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
        public async Task<List<TrainingMaterial>> GetAllAsync()
        {
            return await _context.TrainingMaterials
                .Where(x => x.IsActive)
                .OrderBy(x => x.Title)
                .ToListAsync();
        }

        /// <summary>
        /// Gets a training material by ID
        /// </summary>
        public async Task<TrainingMaterial?> GetByIdAsync(int id)
        {
            return await _context.TrainingMaterials.FindAsync(id);
        }

        /// <summary>
        /// Creates a new training material
        /// </summary>
        public async Task<TrainingMaterial> CreateAsync(TrainingMaterial material)
        {
            material.CreatedAt = DateTimeOffset.UtcNow;
            _context.TrainingMaterials.Add(material);
            await _context.SaveChangesAsync();
            return material;
        }

        /// <summary>
        /// Updates an existing training material
        /// </summary>
        public async Task<bool> UpdateAsync(TrainingMaterial material)
        {
            var existing = await _context.TrainingMaterials.FindAsync(material.Id);
            if (existing == null)
                return false;

            material.UpdatedAt = DateTimeOffset.UtcNow;
            material.CreatedAt = existing.CreatedAt; // Preserve creation date
            
            _context.Entry(existing).CurrentValues.SetValues(material);
            await _context.SaveChangesAsync();
            return true;
        }

        /// <summary>
        /// Deletes a training material by ID
        /// </summary>
        public async Task<bool> DeleteAsync(int id)
        {
            var material = await _context.TrainingMaterials.FindAsync(id);
            if (material == null)
                return false;

            // Soft delete
            material.IsActive = false;
            material.UpdatedAt = DateTimeOffset.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
