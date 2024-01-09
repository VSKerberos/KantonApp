using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API;

[ApiController]
[Route("api/[controller]")] // /api/account
public class AccountController : ControllerBase
{
    private readonly IUserRepository userRepository;
    private readonly IMapper mapper;
    private readonly ITokenService tokenService;

    public AccountController(IUserRepository userRepository,IMapper mapper, ITokenService tokenService)
{
        this.userRepository = userRepository;
        this.mapper = mapper;
        this.tokenService = tokenService;
    }


[HttpPost("register")]

public async Task<ActionResult<UserDto>> Register(AppUserDto appUserDto)
{
    using var hmac = new HMACSHA512();

    var user = new AppUser{

        UserName = appUserDto.UserName.ToLower(),
        PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(appUserDto.Password)),
        PasswordSalt = hmac.Key
    };

    await userRepository.AddAsync(user);

    return new UserDto {
        Username = user.UserName,
        Token = tokenService.CreateToken(user)
    };
}

[HttpPost("login")]
public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
{
     var user = await userRepository.SingleOrDefault(loginDto.Username);

     if(user == null) return Unauthorized("Invalid username or password");

      using var hmac = new HMACSHA512(user.PasswordSalt);

      var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

      for (int i = 0; i < computedHash.Length; i++)
      {
        if(computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid username or password");
      }

        return new UserDto {
        Username = user.UserName,
        Token = tokenService.CreateToken(user)
    };

}
}
