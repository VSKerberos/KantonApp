using FluentValidation;

namespace API;
public class CreateAppUserValidator : AbstractValidator<AppUserDto>
{
    public CreateAppUserValidator()
    {
        RuleFor(X=>X.UserName)
        .NotNull()
        .NotEmpty()
        .Length(1,25)
        .WithMessage("Lütfen Kullanıcı adı giriniz");

        RuleFor(y=>y.Password)
        .NotNull()
        .NotEmpty()
        .Length(1,25)
        .WithMessage("Lütfen Password giriniz.");

    }
}
