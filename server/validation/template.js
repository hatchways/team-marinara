
exports.validateTemplateInput = data => {
    const errors = {};
    const { name, subject, content } = data;

    if (!name) {
        errors.name = "A name is required";
      }

    if (!subject) {
    errors.firstName = "A subject is required";
    }

    if (!content) {
    errors.firstName = "Some content is required";
    }
    
    return {
        errors,
        isValid : !Object.keys(errors).length > 0
    }
}