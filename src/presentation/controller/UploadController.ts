import { AddPhotoData } from '@/domain/usecases/add-photodata'
import { badRequest, HttpRequest, HttpResponse, ok } from '../web'

export class UploadController {
  private readonly addPhotoData: AddPhotoData
  constructor(addPhotoData: AddPhotoData) {
    this.addPhotoData = addPhotoData
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.companyKey) {
      return badRequest(new Error('companyKey'))
    }
    if (!httpRequest.body.image) {
      return badRequest(new Error('image'))
    }

    if (!httpRequest.body.userKey) {
      return badRequest(new Error('userKey'))
    }

    const { companyKey, userKey, image } = httpRequest.body
    if (!httpRequest.body.image.includes('.jpg', '.png')) {
      return badRequest(new Error('The image has not the correct format'))
    }
    const photoData = await this.addPhotoData.add({ companyKey, userKey, image })
    return ok(photoData)
  }
}
