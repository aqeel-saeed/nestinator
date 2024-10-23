import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/base/base.repository";
import { Post } from "../entities/post.entity";

@Injectable()
export class PostRepository extends BaseRepository<Post> {
    // add a custom method, to find posts by title
    async findByTitle(title: string): Promise<Post[]> {
        return this.find({ where: { title } });
    }
}
