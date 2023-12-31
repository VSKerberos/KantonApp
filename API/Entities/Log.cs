﻿namespace API;
public class Log
{
    public int Id { get; set; }
    public string InnerException { get; set; }
    public string Source { get; set; }
    public string Message { get; set; }
    public string StackTrace { get; set; }
    public string TargetSite { get; set; }
    public string HelpLink { get; set; }
    public string HResult { get; set; }
     public DateTime TimeStamp { get; set; }
}
