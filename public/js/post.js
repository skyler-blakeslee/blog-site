const newFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#comment-title').value.trim();
    const description = document.querySelector('#comment-desc').value.trim();
    debugger;
    if (name && description) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ name, description }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/post');
        } else {
            alert('Failed to create post');
        }
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete post');
        }
    }
};

document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newFormHandler);

