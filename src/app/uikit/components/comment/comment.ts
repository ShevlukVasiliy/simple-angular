import { Component, Input } from '@angular/core';
import { Comment as CommentData } from '../../../interface/posts/get-post';
import { formatDateTime } from '../../../utils/date';
import { initials, mediaUrl } from '../../../utils/media';

@Component({
  selector: 'app-comment',
  imports: [],
  templateUrl: './comment.html',
  styleUrl: './comment.css',
})
export class Comment {
  @Input({ required: true }) comment!: CommentData;

  get avatarUrl(): string {
    return mediaUrl(this.comment.user?.avatar);
  }

  get userInitials(): string {
    var user = this.comment.user;

    return initials(user?.firstName, user?.lastName);
  }

  get userName(): string {
    var user = this.comment.user;

    if (!user) {
      return '';
    }

    return `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
  }

  get createdOn(): string {
    return formatDateTime(this.comment.createdOn);
  }
}
