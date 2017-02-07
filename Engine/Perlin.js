/*var PERLIN_PAGE_DIM = 32;
var PERLIN_PAGE_DIM_2 = 34;
var PERLIN_PAGE_SIZE = PERLIN_GRID_DIM * PERLIN_GRID_DIM;
var PERLIN_PAGE_SIZE_2 = PERLIN_GRID_DIM_2 * PERLIN_GRID_DIM_2;

Perlin = function(seed) {
    this.seed = seed;
    this.grid = new Map2D();
    this.vecData = new Uint8Array(PERLIN_PAGE_SIZE_2);
}

perlin.prototype.initPage = function(pageX, pageY) {
    var page = new Uint8Array(PERLIN_PAGE_SIZE);
    this.grid.set(pageX, pageY, page);
		
    var seed = Noise.rand(this.seed[0] ^ Noise.rand(pageX) ^ Noise.rand(pageY));
		// Generate random vectors:
		for (var x = 0; x < PERLIN_PAGE_DIM_2; ++x) {
			for (var y = 0; y < PERLIN_PAGE_DIM_2; ++y) {
                var seed = Noise.rand(this.seed[0] ^ Noise.rand(pageX) ^ Noise.rand(pageY));
				this.vecData[x + PERLIN_PAGE_DIM_2 * y] = noiseNextV2(seed);
			}
		}
		
		auto getVec = [this, pageGridPos](i32vec2 pos) {
			i32vec2 pos2(pos.x-pageGridPos.x+1, pos.y-pageGridPos.y+1);
			if (pos2.x < 0 || pos2.y < 0 || pos2.x > c_pageDim || pos2.y > c_pageDim)
				std::cout << "ERROR" << std::endl;
			return m_vecData[pos2.x + c_pageDim_2 * pos2.y];
		};
		
		// TODO: Octaves, Noise-function
		// Calculate values and add to page.
		for (int x = 0; x < c_pageDim; ++x) {
			for (int y = 0; y < c_pageDim; ++y) {
				dvec2 pos = dvec2(x + pagePos.x*c_pageDim, y + pagePos.y*c_pageDim)/scale;
				i32vec2 gridPos = i32vec2(glm::floor(pos));
				dvec2 localPos = pos - dvec2(gridPos);
				
				i32vec2 ap = gridPos;
				i32vec2 dp = ap + i32vec2(1);
				i32vec2 bp = i32vec2(dp.x, ap.y);
				i32vec2 cp = i32vec2(ap.x, dp.y);
				
				// Grid vectors
				dvec2 a = getVec(ap);
				dvec2 b = getVec(bp);
				dvec2 c = getVec(cp);
				dvec2 d = getVec(dp);
				
				// Delta vectors
				dvec2 ad = localPos;
				dvec2 dd = localPos-dvec2(1.0);
				dvec2 bd = dvec2(dd.x, ad.y);
				dvec2 cd = dvec2(ad.x, dd.y);
				
				
				// Dot products:
				double dotA = dot(a, ad); 
				double dotB = dot(b, bd); 
				double dotC = dot(c, cd); 
				double dotD = dot(d, dd); 
				
				// Interpolation values
				double x1 = localPos.x*localPos.x*(3.0-2.0*localPos.x);//fract.x;
				double x0 = 1.f-x1;
				double y1 = localPos.y*localPos.y*(3.0-2.0*localPos.y);
				double y0 = 1.f-y1;
				
				// Calculate value!
				double value =
					x0*y0*dotA +
					x1*y0*dotB +
					x0*y1*dotC +
					x1*y1*dotD;
					
// 				if (pagePos.x < 0 && pagePos.y < 0 && value == 0.0 && x != 0 && y != 0) {
// 					std::cout << value << std::endl;
// 					std::cout << glm::length(ad) << std::endl;
// 				}
				
				// Update max/min values.
				maxValue = std::max(maxValue, value);
				minValue = std::min(minValue, value);
				
				// Add value.
				m_page->heightMap[x + c_pageDim * y] = value;
			}
		}
		
		m_page->maxHeight = maxValue;
		m_page->minHeight = minValue;
		
		// Insert page.
		auto it = m_pages.emplace(pagePos, std::move(m_page)).first;
		m_page = std::unique_ptr<Page2D>(new Page2D);
		return it->second.get();
}
*/
