export class MessageListNode{
    private static nodes : Map<number, MessageListNode> = new Map();
    private nextNode : MessageListNode = this;
    private prevNode : MessageListNode = this;
    private id       : number;
    constructor (id : number){
        this.id = id;
    }

    insert(node : MessageListNode) : void{
        MessageListNode.nodes.set(node.id, node);
        this.nextNode.prevNode = node;
        node.nextNode = this.nextNode;
        node.prevNode = this;
        this.nextNode = node;
    }

    delete() : MessageListNode{
        MessageListNode.nodes.delete(this.id);
        if (this.nextNode == this) {
            this.prevNode = null;
            this.nextNode = null;
            return null;
        }
        this.prevNode.nextNode = this.nextNode;
        this.nextNode.prevNode = this.prevNode;
        this.prevNode = null;
        this.nextNode = null;
        return this.nextNode;
    }

    get next():MessageListNode{
        return this.nextNode;
    }
    static get(id:number) : MessageListNode{
        return MessageListNode.nodes.get(id);
    }
       
}