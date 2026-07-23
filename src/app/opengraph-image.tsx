import { ImageResponse } from 'next/og';

export const alt = 'Divya Prakash Gupta - Senior Full Stack Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '80px',
                    background: '#050505',
                    color: 'white',
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                        marginBottom: 40,
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            width: 56,
                            height: 56,
                            borderRadius: 12,
                            background: 'linear-gradient(135deg, #10b981, #3b82f6)',
                            color: 'black',
                            fontWeight: 900,
                            fontSize: 24,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        DP
                    </div>
                    <div style={{ display: 'flex', fontSize: 32, fontWeight: 700 }}>
                        Gupta<span style={{ color: '#10b981' }}>.</span>
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        fontSize: 72,
                        fontWeight: 800,
                        background: 'linear-gradient(90deg, #34d399, #22d3ee, #c084fc)',
                        backgroundClip: 'text',
                        color: 'transparent',
                    }}
                >
                    Divya Prakash Gupta
                </div>

                <div style={{ display: 'flex', fontSize: 34, color: '#9ca3af', marginTop: 20 }}>
                    Senior Full Stack Engineer
                </div>

                <div style={{ display: 'flex', fontSize: 26, color: '#6b7280', marginTop: 30 }}>
                    Amsterdam, NL &bull; 15+ Years Experience
                </div>
            </div>
        ),
        { ...size }
    );
}
