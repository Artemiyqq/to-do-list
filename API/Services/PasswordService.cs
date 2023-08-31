using System.Security.Cryptography;

namespace API.Services
{
    public static class PasswordService
    {
        private const int _saltSize = 16;
        private const int _keySize = 32;
        private const int _iterations = 10000;
        private static readonly HashAlgorithmName _algorithm = HashAlgorithmName.SHA256;

        private const char segmentDelimeter = ':';

        public static string Hash(string input) 
        {
            byte[] salt = RandomNumberGenerator.GetBytes(_saltSize);
            byte[] hash = Rfc2898DeriveBytes.Pbkdf2(input,
                                                    salt,
                                                    _iterations,
                                                    _algorithm,
                                                    _keySize);

            return string.Join(segmentDelimeter,
                               Convert.ToBase64String(hash),
                               Convert.ToBase64String(salt),
                               _iterations,
                               _algorithm);
        }

        public static bool Verify(string input, string hashString)
        {
            string[] segments = hashString.Split(segmentDelimeter);
            byte[] hash = Convert.FromBase64String(segments[0]);
            byte[] salt = Convert.FromBase64String(segments[1]);
            int iterations = int.Parse(segments[2]);
            HashAlgorithmName algorithm = new(segments[3]);

            byte[] inputHash = Rfc2898DeriveBytes.Pbkdf2(input,
                                                         salt,
                                                         iterations,
                                                         algorithm,
                                                         hash.Length);

            return CryptographicOperations.FixedTimeEquals(inputHash, hash);
        }
    }
}
