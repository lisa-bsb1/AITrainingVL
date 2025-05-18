using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Visma.AiTrainig.Api.Models;

namespace Visma.AiTrainig.Api.Data.EntityConfigurations
{
    /// <summary>
    /// Configuration for TrainingMaterial entity
    /// </summary>
    public class TrainingMaterialConfiguration : IEntityTypeConfiguration<TrainingMaterial>
    {
        public void Configure(EntityTypeBuilder<TrainingMaterial> builder)
        {
            builder.HasKey(e => e.Id);
            
            builder.Property(e => e.Title)
                .IsRequired()
                .HasMaxLength(200);
                
            builder.Property(e => e.Description)
                .HasMaxLength(2000);
                
            builder.Property(e => e.Type)
                .IsRequired()
                .HasMaxLength(50);
                
            builder.Property(e => e.DifficultyLevel)
                .IsRequired();
                
            builder.Property(e => e.Url)
                .HasMaxLength(500);
                
            // Seed data
            builder.HasData(
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
