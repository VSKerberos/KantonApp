﻿namespace API;
public class AppUserDto
{
    public int Id { get; set; }

    public string UserName { get; set; }

    public string Password { get; set; }

    public byte[] PasswordHash { get; set; }

    public byte[] PasswordSalt { get; set; }

}
