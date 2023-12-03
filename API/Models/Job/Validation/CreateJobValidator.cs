using FluentValidation;

namespace API;
public class CreateJobValidator : AbstractValidator<CreateJobDto>
{
    public CreateJobValidator()
    {
         RuleFor(x => x.Title)
                .NotNull()
                .NotEmpty()
                .Length(1,50)
                .WithMessage("Lütfen görev adını giriniz.");
    }

}
