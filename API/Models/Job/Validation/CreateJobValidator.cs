using FluentValidation;

namespace API;
public class CreateJobValidator : AbstractValidator<CreateJobDto>
{
    public CreateJobValidator()
    {
         RuleFor(x => x.Title)
                .NotNull()
                .NotEmpty()
                .Length(1,20)
                .WithMessage("Lütfen görev adını giriniz.");
    }

}
