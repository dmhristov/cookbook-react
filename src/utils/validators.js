export const inputsAreValid = (title, descriprion, ingredients) => {
    if (
        title.trim() === "" ||
        descriprion.trim() === "" ||
        ingredients.trim() === ""
    )
        return false;

    return true;
};
