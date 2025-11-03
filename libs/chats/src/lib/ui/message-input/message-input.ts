import {ChangeDetectionStrategy, Component, EventEmitter, inject, Output, Renderer2} from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AvatarCircle, SvgIcon} from '@tt/common-ui';
import {Profile} from '@tt/profile';

@Component({
  selector: 'app-message-input',
  imports: [AvatarCircle, NgIf, ReactiveFormsModule, SvgIcon, FormsModule],
  templateUrl: './message-input.html',
  styleUrl: './message-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageInput {
  r2 = inject(Renderer2);
  me = inject(Profile).me;

  @Output() created = new EventEmitter<string>();

  postText = '';

  onTextAreaInput(event: Event) {
    const textArea = event.target as HTMLTextAreaElement;

    this.r2.setStyle(textArea, 'height', 'auto');
    this.r2.setStyle(textArea, 'height', textArea.scrollHeight + 'px');
  }

  onCreatePost() {
    if (!this.postText) return;

    this.created.emit(this.postText);
    this.postText = '';
  }

  scroll() {
    //@ts-ignore
    document.getElementById('textmessage').scrollTop = document.getElementById('textmessage').scrollHeight;
  }
}
