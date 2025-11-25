import { prisma } from "./prisma"

export async function genarateUniqueSlug(base) {
    try {
        const clean = base.toLowerCase().replace(/\s+/g, "-")
        let slug = clean
        let count = 1
        while (await prisma.userMaster.findUnique({ where: { slug } })) {
            slug = `${clean}${count++}`
        }
        return slug
    } catch (error) {
        console.log(error)
        return error
    }
}