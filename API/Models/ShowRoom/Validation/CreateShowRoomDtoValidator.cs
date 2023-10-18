using FluentValidation;

namespace API;
public class CreateShowRoomDtoValidator : AbstractValidator<CreateShowRoomDto>
{
public CreateShowRoomDtoValidator()
{
      RuleFor(x => x.Header)
                .NotNull()
                .NotEmpty()
                .Length(1,20)
                .WithMessage("Lütfen başlık  giriniz.");

                   RuleFor(x => x.Desc)
                .NotNull()
                .NotEmpty()
                .Length(1,20)
                .WithMessage("Lütfen açıklama  giriniz.");

          RuleFor(x => x.Path)
                .NotNull()
                .NotEmpty()
                .Length(1,20)
                .WithMessage("Lütfen dosya seçiniz.");  
}
}
