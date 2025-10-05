import React, { useState, useEffect } from "react";
import taxonomy from "../../../tools/taxonomy_results.json";


export default function BlogTimeline({ posts }) {
  const [selectedSection, setSelectedSection] = useState("All");


  const filteredPosts = posts.filter(
    (post) => (post.data.categories || []).includes(selectedSection) || selectedSection === "All"
  )


  return (
    <>
      <div className="category-selector" style={{marginBottom:'2em', justifySelf:'center', display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf:'center' }} >
        <button
          className={`color-btn${selectedSection === "All" ? " selected" : ""}`}
          onClick={() => setSelectedSection("All")}
        >
          All
        </button>
        {taxonomy.main_sections.map((section) => (
          <div
            key={section.name}
            
          >
            <button
              className={`color-btn${selectedSection === section.name ? " selected" : ""}`}
              onClick={() => setSelectedSection(section.name)}
            >
              {section.name}
            </button>
          </div>
        ))
        }
      </div>

    {filteredPosts.length > 0? (
      <section className="timeline-container">
      <div className="timeline-line" id="timeline-line"></div>
      <ul id="posts-list">
        {filteredPosts.map((post) => (
          <li className="post-entry" key={post.id}>
            <a className="post-link" href={`/blog/${post.id}/`}>
              <p className="post-date">{post.data.pubDate.toLocaleDateString('en-uk', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}</p>
              <div className="post-title">{post.data.title}</div>
              {post.data.heroImage && (
                <img className="post-image" src={post.data.heroImage.src} alt="" />
              )}
            </a>
          </li>
        ))}
      </ul>
    </section>
      ): (
      <div className="no-posts-message">
        No posts found for the selected category.
      </div>
    )}
              </>
  );
}