<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\TestControllerCreateRequest;
use App\Http\Requests\TestControllerUpdateRequest;
use App\Repositories\TestControllerRepository;
use App\Validators\TestControllerValidator;

/**
 * Class TestControllersController.
 *
 * @package namespace App\Http\Controllers;
 */
class TestControllersController extends Controller
{
    /**
     * @var TestControllerRepository
     */
    protected $repository;

    /**
     * @var TestControllerValidator
     */
    protected $validator;

    /**
     * TestControllersController constructor.
     *
     * @param TestControllerRepository $repository
     * @param TestControllerValidator $validator
     */
    public function __construct(TestControllerRepository $repository, TestControllerValidator $validator)
    {
        $this->repository = $repository;
        $this->validator  = $validator;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->repository->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));
        $testControllers = $this->repository->all();

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $testControllers,
            ]);
        }

        return view('testControllers.index', compact('testControllers'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  TestControllerCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *
     * @throws \Prettus\Validator\Exceptions\ValidatorException
     */
    public function store(TestControllerCreateRequest $request)
    {
        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $testController = $this->repository->create($request->all());

            $response = [
                'message' => 'TestController created.',
                'data'    => $testController->toArray(),
            ];

            if ($request->wantsJson()) {

                return response()->json($response);
            }

            return redirect()->back()->with('message', $response['message']);
        } catch (ValidatorException $e) {
            if ($request->wantsJson()) {
                return response()->json([
                    'error'   => true,
                    'message' => $e->getMessageBag()
                ]);
            }

            return redirect()->back()->withErrors($e->getMessageBag())->withInput();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $testController = $this->repository->find($id);

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $testController,
            ]);
        }

        return view('testControllers.show', compact('testController'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $testController = $this->repository->find($id);

        return view('testControllers.edit', compact('testController'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  TestControllerUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *
     * @throws \Prettus\Validator\Exceptions\ValidatorException
     */
    public function update(TestControllerUpdateRequest $request, $id)
    {
        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $testController = $this->repository->update($request->all(), $id);

            $response = [
                'message' => 'TestController updated.',
                'data'    => $testController->toArray(),
            ];

            if ($request->wantsJson()) {

                return response()->json($response);
            }

            return redirect()->back()->with('message', $response['message']);
        } catch (ValidatorException $e) {

            if ($request->wantsJson()) {

                return response()->json([
                    'error'   => true,
                    'message' => $e->getMessageBag()
                ]);
            }

            return redirect()->back()->withErrors($e->getMessageBag())->withInput();
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $deleted = $this->repository->delete($id);

        if (request()->wantsJson()) {

            return response()->json([
                'message' => 'TestController deleted.',
                'deleted' => $deleted,
            ]);
        }

        return redirect()->back()->with('message', 'TestController deleted.');
    }
}
