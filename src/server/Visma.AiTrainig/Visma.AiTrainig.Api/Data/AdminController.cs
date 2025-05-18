using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Visma.AiTrainig.Api.Data
{
    /// <summary>
    /// Controller for administrative functions
    /// </summary>
    [ApiController]
    [Route("api/admin")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public AdminController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /// <summary>
        /// Gets all training materials including inactive ones
        /// </summary>
        [HttpGet("materials/all")]
        public async Task<IActionResult> GetAllMaterialsIncludingInactive()
        {
            var materials = await _dbContext.TrainingMaterials
                .OrderBy(m => m.Title)
                .ToListAsync();

            return Ok(materials);
        }

        /// <summary>
        /// Restore a soft-deleted material
        /// </summary>
        [HttpPatch("materials/{id}/restore")]
        public async Task<IActionResult> RestoreMaterial(int id)
        {
            var material = await _dbContext.TrainingMaterials.FindAsync(id);
            if (material == null)
                return NotFound();

            material.IsActive = true;
            material.UpdatedAt = DateTimeOffset.UtcNow;
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
