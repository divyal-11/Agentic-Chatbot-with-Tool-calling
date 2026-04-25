from PIL import Image
from collections import Counter

def get_colors():
    img = Image.open('C:/Users/LENOVO/OneDrive/Desktop/perplexity_2.0-main/client/public/image.png')
    img = img.resize((150, 150))
    pixels = list(img.getdata())
    
    if img.mode == 'RGBA':
        pixels = [p[:3] for p in pixels if p[3] > 0]
        
    counts = Counter(pixels)
    print("Most common colors:")
    for color, count in counts.most_common(10):
        print('#{:02x}{:02x}{:02x}'.format(*color[:3]))

if __name__ == '__main__':
    get_colors()
