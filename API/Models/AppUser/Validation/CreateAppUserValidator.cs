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

    }
}
