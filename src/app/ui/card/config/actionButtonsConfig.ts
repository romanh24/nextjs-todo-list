import DeletePic from '../../../../../public/Delete.svg';
import EditPic from '../../../../../public/Edit.svg';

export const actionButtons = [
  {
    title: 'Edit To Do',
    onClick: 'handleEdit',
    icon: EditPic,
    alt: 'Edit Picture',
  },
  {
    title: 'Delete To Do',
    onClick: 'handleDelete',
    icon: DeletePic,
    alt: 'Delete Picture',
  },
];
