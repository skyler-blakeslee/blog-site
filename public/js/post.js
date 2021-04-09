const newFormHandler = async (event) => {
    event.preventDefault();

    const description = document.querySelector('#comment-desc').value.trim();
    const post_id = document.querySelector('#post_id').value;
    if (description) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ description: description, post_id: post_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            response.json().then((data) => {
                console.log(data)
                document.location.replace(`/post/${data.post_id}`);

            })
        } else {
            alert('Failed to create comment');
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

