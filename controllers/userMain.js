import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



export const readBlog = (req,res)=>{
    res.render('blog_read');
}


//get in index.
// Controller to retrieve posts
export const getPost = async (req, res) => {
    try {
        // Fetch all posts from database
        const posts = await prisma.posts.findMany();
        
        // Send the posts as JSON response
        // res.status(200).json(posts);
        res.render('index',{
            posts
        })
    } catch (error) {
        // Handle errors
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


// Controller to retrieve a post by ID
export const getReadById = async (req, res) => {
    const { id } = req.params; // Dapatkan parameter ID dari URL permintaan
    try {
        // Ambil post dari database berdasarkan ID
        const post = await prisma.posts.findUnique({
            where: {
                id: id // Parse ID menjadi integer karena disimpan sebagai string dalam database
            }
        });

        if (!post) {
            // Jika post dengan ID yang diberikan tidak ditemukan, kirim respons 404
            return res.status(404).json({ error: "Post not found" });
        }

        // Ubah tag <a> dengan tautan yang sesuai dalam konten post
        post.content = post.content.replace(/<a href="(.*?)">(.*?)<\/a>/g, '<a href="$1">$2</a>');

        // Jika post ditemukan, render tampilan 'read' dengan data post yang telah diubah
        res.render('blog_read', { post });
    } catch (error) {
        // Tangani error
        console.error("Error fetching post:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
