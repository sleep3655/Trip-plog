
Component({
  data: {
    showTag: false
  },
  methods: {
    showTopicList() {
      this.setData({ showTag: true });
    },
    closeTag() {
      this.setData({ showTag: false });
    },
    handleTopicClick(e) {
      const topic = e.currentTarget.dataset.topic;
      this.triggerEvent('topicclick', { topic });
      this.setData({ showTag: false });
    }
    
  },
  
});
