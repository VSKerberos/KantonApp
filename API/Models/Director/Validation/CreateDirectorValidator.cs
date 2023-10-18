using FluentValidation;

namespace API;
public class CreateDirectorValidator : AbstractValidator<CreateDirectorDto>
{

    public CreateDirectorValidator()
    {
         RuleFor(x => x.Name)
                .NotNull()
                .NotEmpty()
                .Length(1,20)
                .WithMessage("Lütfen Adınızı giriniz.");

                RuleFor(x => x.SurName)
                .NotNull()
                .NotEmpty()
                .Length(1,20)
                .WithMessage("Lütfen Soyadınızı giriniz.");

                RuleFor(x => x.JobId)
                .NotNull()
                .NotEmpty()
                .WithMessage("Lütfen görev seçiniz.");
        
    }

}


public class UpdateDirectorValidator : AbstractValidator<GetDirectorDto>
{

    public UpdateDirectorValidator()
    {
                     RuleFor(x => x.JobId)
                .NotNull()
                .NotEmpty()
                .WithMessage("Lütfen görev seçiniz.");
          
           RuleFor(x => x.Name)
                .NotNull()
                .NotEmpty()
                .Must(x=>x.Length>1)
                .WithMessage("Lütfen Adınızı giriniz.");

                        RuleFor(x => x.SurName)
                .NotNull()
                .NotEmpty()
                .Must(x=>x.Length>1)
                .WithMessage("Lütfen Adınızı giriniz.");

    }
}