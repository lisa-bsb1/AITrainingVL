namespace Visma.AiTrainig.Api.Data
{
    /// <summary>
    /// Represents a training material in the system
    /// </summary>
    public class TrainingMaterial
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string Type { get; set; } = "Article";
        public int DifficultyLevel { get; set; } = 1;
        public string? Url { get; set; }
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
        public DateTimeOffset? UpdatedAt { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
