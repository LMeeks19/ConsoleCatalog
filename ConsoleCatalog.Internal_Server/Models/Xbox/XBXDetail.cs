namespace ConsoleCatalog.Internal_Server.Models.Xbox
{
    public class XBXDetail
    {
        public int Id { get; set; }
        public string AccountTier { get; set; }
        public string? Bio { get; set; }
        public bool IsVerified { get; set; }
        public int FollowerCount { get; set; }
        public int FollowingCount { get; set; }
        public bool HasGamePass { get; set; }
    }
}
