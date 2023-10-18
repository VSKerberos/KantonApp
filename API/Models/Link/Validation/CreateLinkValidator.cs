using FluentValidation;

namespace API;
public class CreateLinkValidator : AbstractValidator<CreateLinkDto>
{
    public CreateLinkValidator()
    {
         RuleFor(x => x.Title)
                .NotNull()
                .NotEmpty()
                .Length(1,20)
                .WithMessage("Lütfen başlık  giriniz.");

          RuleFor(x => x.Description)
                .NotNull()
                .NotEmpty()
                .Length(1,20)
                .WithMessage("Lütfen açıklama  giriniz.");           

                  RuleFor(x => x.Url)
                .NotNull()
                .NotEmpty()
                .Length(1,20)
                .WithMessage("Lütfen url  giriniz.");     
    }

}
