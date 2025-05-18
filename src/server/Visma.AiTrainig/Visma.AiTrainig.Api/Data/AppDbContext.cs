using Microsoft.EntityFrameworkCore;
using Visma.AiTrainig.Api.Data.EntityConfigurations;
using Visma.AiTrainig.Api.Models;

namespace Visma.AiTrainig.Api.Data
{
    /// <summary>
    /// Database context for the AI Training application
    /// </summary>
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<TrainingMaterial> TrainingMaterials => Set<TrainingMaterial>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Apply entity configurations
            modelBuilder.ApplyConfiguration(new TrainingMaterialConfiguration());
        }
    }
}
