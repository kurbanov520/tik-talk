import { Component, EventEmitter, inject, input, Output, Renderer2 } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AvatarCircle, SvgIcon} from '@tt/common-ui';
import {GlobalStoreService} from '@tt/shared';

@Component({
  selector: 'app-post-feed-input',
  imports: [ReactiveFormsModule, FormsModule, AvatarCircle, SvgIcon],
  templateUrl: './post-feed-input.html',
  styleUrl: './post-feed-input.scss',
})
export class PostFeedInput {
  r2 = inject(Renderer2);
  profile = inject(GlobalStoreService).me;
  avatarUrl = input();

  postText = '';

  @Output() created = new EventEmitter<any>();

  sizeFormTextArea(event: Event) {
    const textArea = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textArea, 'height', 'auto');
    this.r2.setStyle(textArea, 'height', textArea.scrollHeight + 'px');
  }

  submitFormTextArea() {
    this.created.emit(this.postText);
    this.postText = '';
  }
}
