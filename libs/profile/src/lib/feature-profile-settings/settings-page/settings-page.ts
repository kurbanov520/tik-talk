import {ChangeDetectionStrategy, Component, effect, inject, ViewChild} from '@angular/core';
import {ProfileHeader} from '../../ui/profile-header/profile-header';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {firstValueFrom} from 'rxjs';
import {AvatarUpload} from '../../ui/avatar-upload/avatar-upload';
import {toObservable} from '@angular/core/rxjs-interop';
import {AsyncPipe} from '@angular/common';
import {AddressInput, StackInput} from '@tt/common-ui';
import {Profile} from '@tt/profile';

@Component({
  selector: 'app-settings-page',
  imports: [ProfileHeader, ReactiveFormsModule, AvatarUpload, AsyncPipe, StackInput, AddressInput],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPage {
  fb = inject(FormBuilder);
  profileService = inject(Profile);

  @ViewChild(AvatarUpload) avatarUploader: any;

  profile$ = toObservable(this.profileService.me);

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: [''],
    city: [],
  });

  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
        ...this.profileService.me(),
      });
    });
  }

  onSave() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    if (this.avatarUploader.avatar) {
      firstValueFrom(this.profileService.uploadAvatar(this.avatarUploader.avatar));
    }

    firstValueFrom(
    //@ts-ignore
      this.profileService.patchProfile({
        ...this.form.value,
      })
    );
  }
}
