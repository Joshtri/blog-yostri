// import { PrismaClient } from "@prisma/client";
import Post from '../models/Posts.js'; // Import model Posts

// const prisma = new PrismaClient();



// Controller untuk membaca blog
export const readBlog = (req, res) => {
    res.render('blog_read');
}

// Controller untuk mendapatkan semua post
export const getPost = async (req, res) => {
    try {
        // Ambil semua post dari database
        const posts = await Post.find();
        
        // Kirim post sebagai respons JSON
        // res.status(200).json(posts);
        res.render('index', { posts });
    } catch (error) {
        // Tangani error
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Controller untuk mendapatkan post berdasarkan ID
export const getReadById = async (req, res) => {
    const { id } = req.params; // Dapatkan parameter ID dari URL permintaan
    try {
        // Ambil post dari database berdasarkan ID
        const post = await Post.findById(id);

        if (!post) {
            // Jika post dengan ID yang diberikan tidak ditemukan, kirim respons 404
            return res.status(404).json({ error: "Post not found" });
        }

        // Ubah tag <a> dengan tautan yang sesuai dalam konten post
        // post.content = post.content.replace(/<a href="(.*?)">(.*?)<\/a>/g, '<a href="$1">$2</a>');

        // Jika post ditemukan, render tampilan 'blog_read' dengan data post yang telah diubah
        res.render('blog_read', { post });
    } catch (error) {
        // Tangani error
        console.error("Error fetching post:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};