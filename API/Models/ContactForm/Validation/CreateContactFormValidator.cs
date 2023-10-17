using FluentValidation;

namespace API;
public class CreateContactFormValidator : AbstractValidator<CreateContactFormDto>
{

    public CreateContactFormValidator()
    {
         RuleFor(x => x.Name)
                .NotNull()
                .NotEmpty()
                .Length(1,20)
                .WithMessage("Lütfen Adınızı giriniz.");

                    RuleFor(x => x.Surname)
                .NotNull()
                .NotEmpty()
                .Length(1,20)
                .WithMessage("Lütfen Soyadınızı giriniz.");

                RuleFor(x => x.Description)
                .NotNull()
                .NotEmpty()
                .Length(1,200)
                .WithMessage("Lütfen Açıklama giriniz.");

                   RuleFor(x => x.Email)
                .NotNull()
                .NotEmpty()
                .Length(1,200)
                .EmailAddress()
                .WithMessage("Lütfen Email adresinizi giriniz.");
           
        
    }
}
