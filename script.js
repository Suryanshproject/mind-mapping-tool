document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const addNodeButton = document.getElementById('addNode');

    let nodeCount = 0;

    function createNode() {
        nodeCount++;
        const node = document.createElement('div');
        node.classList.add('node');
        node.setAttribute('draggable', 'true');
        node.innerHTML = `Node ${nodeCount}`;
        node.style.left = '100px';
        node.style.top = '100px';
        canvas.appendChild(node);

        node.addEventListener('dragstart', dragStart);
        node.addEventListener('dragend', dragEnd);
    }

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        setTimeout(() => {
            e.target.style.visibility = 'hidden';
        }, 0);
    }

    function dragEnd(e) {
        e.target.style.visibility = 'visible';
    }

    addNodeButton.addEventListener('click', createNode);

    canvas.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    canvas.addEventListener('drop', (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text');
        const draggable = document.querySelector('.node[draggable=true]');
        draggable.style.left = `${e.clientX - canvas.offsetLeft}px`;
        draggable.style.top = `${e.clientY - canvas.offsetTop}px`;
    });
});
