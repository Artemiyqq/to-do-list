namespace API.Tests.ModelsTests
{
    public class ModelValidator
    {
        public static List<ValidationResult> ValidateModel(object model)
        {
            ValidationContext context = new(model, serviceProvider: null, items: null);
            List<ValidationResult> result = new();
            Validator.TryValidateObject(model, context, result, validateAllProperties: true);
            return result;
        }
    }
}
