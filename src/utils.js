import * as logger from './logger'
import { global, constructors } from './config'

/**
 * Helper to add a simple point or text symbol on map using layer
 * @param {Object} info - Some informations about your layer
 * @param {String} info.id - You can pass an ID to find this layer after
 * @param {Object} symbol - Some informations about your symbol
 * @param {Number} symbol.width - Width of the symbol
 * @param {Number} symbol.height - Height of the symbol
 * @param {String} symbol.primitive - Name of the symbol
 * @param {String} symbol.color - Color of the symbol
 * @param {Object} point - Some information about the position of the symbol
 * @param {Number} point.x - X axis position
 * @param {Number} point.y - Y axis position
 * @param {Number} point.z - Z axis position
 * @param {Object} text - Some information about the text content
 * @param {Number} text.color - Color of the text
 * @param {Number} text.content - The content
 * @param {Number} text.size - Size in pixels
 * @param {Number} text.font - Font family ex: FontAwesome
 */
export const addGraphicSymbol = ({info, symbol, point, text}) => {
    const map = global.map
    const GraphicsLayer = constructors.layer.GraphicsLayer
    const PointSymbol3D = constructors.renderer.PointSymbol3D
    const ObjectSymbol3DLayer = constructors.renderer.ObjectSymbol3DLayer
    const Point = constructors.renderer.Point
    const TextSymbol = constructors.renderer.TextSymbol
    const Graphic = constructors.utils.Graphic

    const graphicsLayer = new GraphicsLayer({
        raw: {
            id: info.id !== '' &&
                info.id !== undefined
                ? info.id
                : '[ArcE]Graph'
        }
    })

    const objectSymbol = new PointSymbol3D({
        symbolLayers: [
            new ObjectSymbol3DLayer({
                width: symbol !== undefined
                    ? symbol.width
                    : undefined,
                height: symbol !== undefined
                    ? symbol.height
                    : undefined,
                resource: {
                    primitive: symbol !== undefined
                        ? symbol.primitive
                        : undefined
                },
                material: {
                    color: symbol !== undefined
                        ? symbol.color
                        : undefined
                }
            })
        ]
    })

    const _point = new Point({
        x: point.x,
        y: point.y,
        z: point.z
    })

    const textSymbol = new TextSymbol({
        color: text !== undefined
            ? text.color
            : undefined,
        text: text !== undefined
            ? text.content
            : undefined,
        font: {
            size: text !== undefined
                ? text.size
                : undefined,
            family: text !== undefined
                ? text.font
                : undefined
        }
    })

    const pointGraphic = new Graphic({
        geometry: _point,
        symbol: objectSymbol || textSymbol
    })

    map.add(graphicsLayer)
    graphicsLayer.add(pointGraphic)

    logger.log(`Adding a Graphic Layer on map...`)
}
