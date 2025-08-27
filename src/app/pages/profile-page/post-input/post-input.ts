import {Component, inject, Renderer2} from '@angular/core';
import {AvatarCircle} from "../../../common-ui/avatar-circle/avatar-circle";
import {Profile} from '../../../data/services/profile';
import {NgIf} from '@angular/common';
import {SvgIcon} from '../../../common-ui/svg-icon/svg-icon';
import {PostService} from '../../../data/services/post.service';
import {FormsModule} from '@angular/forms';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-post-input',
  imports: [
    AvatarCircle,
    NgIf,
    SvgIcon,
    FormsModule
  ],
  templateUrl: './post-input.html',
  styleUrl: './post-input.scss'
})
export class PostInput {
  r2 = inject(Renderer2)
  postService = inject(PostService)
  profile = inject(Profile).me

  postText = ''

  onTextAreaInput(event: Event) {
    const textArea = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textArea, 'height', 'auto');
    this.r2.setStyle(textArea, 'height', textArea.scrollHeight + 'px');
  }

  onCreatePost() {
    if (!this.postText) return

    firstValueFrom(this.postService.createPost({
      title: 'Клевый пост',
      content: this.postText,
      authorId: this.profile()!.id
    }))
      .then(() => {
        this.postText = ''
      })
  }




}
