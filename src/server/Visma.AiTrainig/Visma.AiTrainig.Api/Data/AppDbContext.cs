using Microsoft.EntityFrameworkCore;

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

            // Configure TrainingMaterial entity
            modelBuilder.Entity<TrainingMaterial>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Description).HasMaxLength(2000);
                entity.Property(e => e.Type).IsRequired().HasMaxLength(50);
                entity.Property(e => e.DifficultyLevel).IsRequired();
                entity.Property(e => e.Url).HasMaxLength(500);
            });
            
            // Seed data
            modelBuilder.Entity<TrainingMaterial>().HasData(
                new TrainingMaterial
                {
                    Id = 1,
                    Title = "Introduction to AI",
                    Description = "Basic concepts of artificial intelligence",
                    Type = "Article",
                    DifficultyLevel = 1,
                    Url = "https://example.com/intro-to-ai",
                    CreatedAt = DateTimeOffset.UtcNow,
                    IsActive = true
                },
                new TrainingMaterial
                {
                    Id = 2,
                    Title = "Machine Learning Fundamentals",
                    Description = "Learn the basics of machine learning algorithms",
                    Type = "Video",
                    DifficultyLevel = 2,
                    Url = "https://example.com/ml-fundamentals",
                    CreatedAt = DateTimeOffset.UtcNow,
                    IsActive = true
                },
                new TrainingMaterial
                {
                    Id = 3,
                    Title = "Advanced Neural Networks",
                    Description = "Deep dive into neural network architectures",
                    Type = "Course",
                    DifficultyLevel = 3,
                    Url = "https://example.com/advanced-neural-networks",
                    CreatedAt = DateTimeOffset.UtcNow,
                    IsActive = true
                }
            );
        }
    }
}
