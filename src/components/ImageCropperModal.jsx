import React, { useState, useRef, useEffect } from 'react';
import { Crop, ZoomIn, ZoomOut, RotateCw, Check, X } from 'lucide-react';

export const ImageCropperModal = ({ imageSrc, aspectRatio = 1, onCropComplete, onCancel }) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const imageRef = useRef(null);
  const containerRef = useRef(null);

  // Reset when imageSrc changes
  useEffect(() => {
    setZoom(1);
    setRotation(0);
    setOffset({ x: 0, y: 0 });
  }, [imageSrc]);

  if (!imageSrc) return null;

  // Handle Mouse / Touch Dragging
  const handleMouseDown = (e) => {
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX - offset.x, y: clientY - offset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setOffset({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Perform final crop onto an HTML5 Canvas
  const handleSaveCrop = () => {
    const img = imageRef.current;
    if (!img) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Desired output resolution (optimized for high quality with minimal data footprint)
    const outputWidth = aspectRatio === 1 ? 320 : 720;
    const outputHeight = Math.round(outputWidth / aspectRatio);

    canvas.width = outputWidth;
    canvas.height = outputHeight;

    ctx.save();
    // Fill white background for JPEG rendering
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, outputWidth, outputHeight);

    // Move to center of canvas for rotation and offset calculation
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);

    // Compute aspect-fit scaling factor
    const imgAspect = img.naturalWidth / img.naturalHeight;
    let drawWidth, drawHeight;

    if (imgAspect > aspectRatio) {
      drawHeight = outputHeight;
      drawWidth = outputHeight * imgAspect;
    } else {
      drawWidth = outputWidth;
      drawHeight = outputWidth / imgAspect;
    }

    // Offset normalized to output scale
    const scaleFactor = outputWidth / 300; // 300px is preview container width
    const drawX = (offset.x * scaleFactor) - (drawWidth / 2);
    const drawY = (offset.y * scaleFactor) - (drawHeight / 2);

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    ctx.restore();

    // Export as JPEG with 0.82 compression quality for 10x size savings (~30KB vs ~400KB)
    const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
    onCropComplete(croppedDataUrl);
  };

  return (
    <div className="modal-overlay" onClick={onCancel} style={{ zIndex: 99999 }}>
      <div 
        className="modal-content animate-fade-in" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '520px', padding: '1.75rem', background: '#ffffff' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ background: 'var(--primary-light)', padding: '0.5rem', borderRadius: '12px', color: 'var(--primary)' }}>
              <Crop size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', margin: 0, color: '#0f172a' }}>Potong & Atur Foto (Crop)</h3>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Mendukung foto dengan background transparan (PNG)</span>
            </div>
          </div>
          <button onClick={onCancel} style={{ color: '#94a3b8' }}>
            <X size={20} />
          </button>
        </div>

        {/* Interactive Viewport Container with Checkerboard Transparent Background Pattern */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          style={{
            position: 'relative',
            width: '100%',
            height: '320px',
            background: 'repeating-conic-gradient(#e2e8f0 0% 25%, #cbd5e1 0% 50%) 50% / 20px 20px',
            borderRadius: '16px',
            overflow: 'hidden',
            cursor: isDragging ? 'grabbing' : 'grab',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            userSelect: 'none'
          }}
        >
          {/* Target Crop Mask Frame */}
          <div
            style={{
              position: 'absolute',
              width: aspectRatio === 1 ? '240px' : '280px',
              height: aspectRatio === 1 ? '240px' : `${280 / aspectRatio}px`,
              border: '3px solid var(--primary)',
              boxShadow: '0 0 0 9999px rgba(15, 23, 42, 0.45)',
              borderRadius: aspectRatio === 1 ? '50%' : '14px',
              pointerEvents: 'none',
              zIndex: 10
            }}
          />

          {/* Draggable & Scalable Image */}
          <img
            ref={imageRef}
            src={imageSrc}
            alt="To crop"
            draggable={false}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom}) rotate(${rotation}deg)`,
              transition: isDragging ? 'none' : 'transform 0.1s ease-out'
            }}
          />
        </div>

        {/* Controls Toolbar */}
        <div style={{ marginTop: '1.25rem', background: '#f8fafc', padding: '1rem', borderRadius: '14px', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {/* Zoom Slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ZoomOut size={16} color="#64748b" />
            <input
              type="range"
              min="1"
              max="3"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              style={{ flex: 1, accentColor: 'var(--primary)' }}
            />
            <ZoomIn size={16} color="var(--primary)" />
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, width: '40px', textAlign: 'right' }}>
              {Math.round(zoom * 100)}%
            </span>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => setRotation((prev) => (prev + 90) % 360)}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.82rem', gap: '0.4rem' }}
            >
              <RotateCw size={14} /> Putar 90°
            </button>

            <button
              type="button"
              onClick={() => { setZoom(1); setRotation(0); setOffset({ x: 0, y: 0 }); }}
              style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}
            >
              Reset Posisi
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
          <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={onCancel}>
            Batal
          </button>
          <button type="button" className="btn btn-primary" style={{ flex: 1.5 }} onClick={handleSaveCrop}>
            <Check size={16} /> Potong & Simpan Foto
          </button>
        </div>
      </div>
    </div>
  );
};
