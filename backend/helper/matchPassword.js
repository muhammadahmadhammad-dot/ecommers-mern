import bcrypt from "bcrypt"

export const matchPassword =async (passwordForMatch, password) => {
    return await bcrypt.compare(passwordForMatch, password);
}