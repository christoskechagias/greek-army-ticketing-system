import React, { useRef, useEffect } from "react";
import { List, Image, Avatar } from "antd";
import moment from "moment";
import { FaRegCommentDots } from "react-icons/fa6";
import "moment/locale/el";

function CommentList({ comments, manualScrolling, setManualScrolling }) {
  const containerRef = useRef(null);

  const scrollToBottom = () => {
    if (!manualScrolling && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  return (
    <div
      className="p-3 overflow-y-auto h-full w-full"
      onScroll={() => {
        if (
          containerRef.current.scrollHeight - 500 !==
          containerRef.current.scrollTop
        ) {
          setManualScrolling(true);
        } else {
          setManualScrolling(false);
        }
      }}
      ref={containerRef}
    >
      <List
        locale={{
          emptyText: (
            <div className="flex flex-col items-center justify-center mt-32">
              <FaRegCommentDots className="w-10 h-10" />
              <p className="text-lg">Κανένα σχόλιο</p>
            </div>
          ),
        }}
        className="overflow-hidden break-words"
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(comment) => {
          const { firstName, lastName } = comment.author;
          return (
            <List.Item key={comment._id}>
              <List.Item.Meta
                avatar={<Avatar>{firstName?.[0]}</Avatar>}
                title={
                  <p className="text-base mb-2">{firstName + " " + lastName}</p>
                }
                description={
                  <div>
                    <p className="text-xs mt-[-10px]">
                      {moment(comment.createdAt).fromNow()}
                    </p>
                    <p className="text-black text-sm mt-2">{comment.text}</p>
                    {comment?.images?.map((image, index) => (
                      <Image
                        key={index}
                        width={100}
                        height={100}
                        src={image}
                        alt="Ticket"
                      />
                    ))}
                  </div>
                }
              />
            </List.Item>
          );
        }}
      />
    </div>
  );
}

export default CommentList;
