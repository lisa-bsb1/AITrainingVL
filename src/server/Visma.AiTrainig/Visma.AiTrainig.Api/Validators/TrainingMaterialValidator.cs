using FluentValidation;
using Visma.AiTrainig.Api.Models;

namespace Visma.AiTrainig.Api.Validators
{
    /// <summary>
    /// Validator for the TrainingMaterial entity
    /// </summary>
    public class TrainingMaterialValidator : AbstractValidator<TrainingMaterial>
    {
        public TrainingMaterialValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required")
                .MaximumLength(200).WithMessage("Title cannot exceed 200 characters");
            
            RuleFor(x => x.Description)
                .MaximumLength(2000).WithMessage("Description cannot exceed 2000 characters");
            
            RuleFor(x => x.Type)
                .NotEmpty().WithMessage("Type is required")
                .MaximumLength(50).WithMessage("Type cannot exceed 50 characters");
            
            RuleFor(x => x.DifficultyLevel)
                .InclusiveBetween(1, 5).WithMessage("Difficulty level must be between 1 and 5");
            
            RuleFor(x => x.Url)
                .MaximumLength(500).WithMessage("URL cannot exceed 500 characters")
                .When(x => !string.IsNullOrEmpty(x.Url));
        }
    }
}
