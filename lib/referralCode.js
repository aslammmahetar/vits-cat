export function generateReferralCode(firmName = "") {
    const prefix = firmName.replace(/[^a-zA-Z]/g, "").slice(0, 3).toUpperCase();
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
    const referralCode = `${prefix}${randomPart}`;
    return referralCode;
}
